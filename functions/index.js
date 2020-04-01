
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const md5 = require('md5')
admin.initializeApp()


exports.setPaymentInfo = functions.https.onRequest(async (req, res)=>{

    const user = req.body.extra1
    const userRef = admin.database().ref(`/Users/${user}`)
    const queryCourses = await userRef.child("/courses").once("value")
    const courseResponse = queryCourses.val()
    let new_courses = courseResponse


    const apikey = "iDkJHSBs9Jc5AKrIaL65DBmsr4"
    const amount = req.body.value
    
    const cart = JSON.parse(req.body.extra2)

    const merchantid = req.body.merchant_id
    const reference = req.body.reference_sale
    const signature = req.body.sign
    const status = req.body.state_pol
    const new_val = parseInt(amount)
    const decimals = Math.round((amount - new_val)*100)
    const intFirstDecimal = Math.round(parseInt(decimals/10))
    const intSecondDecimal = Math.round(decimals % 10)
    let new_price

    
    if(intSecondDecimal === 0){
        new_price = `${new_val}.${intFirstDecimal}`
    }
    else{
        new_price = `${new_val}.${intFirstDecimal}${intSecondDecimal}`
    }

    const rSignature = `${apikey}~${merchantid}~${reference}~${new_price}~COP~${status}`
    const md5Signature = md5(rSignature)

    if(!new_courses[0]){
        new_courses = cart
    }
    else{
        cart.map( item => 
            { 
            if(!courseResponse.includes(item)){
                new_courses = [...new_courses, item]
            }
            return null
        } ) 
    }

    const userInfo = {
        courses: new_courses,
    }


    if(signature === md5Signature){
        userRef.update(userInfo)
        .then(response => res.status(200).send("cursos actualizados correctamente").end())
        .catch(error => res.status(500).send("error 500 contacte el administrador del sistema").end())

        userRef.child("/purchases").push(reference)
    }
    else{
        res.status(404).send("Error").end()
    }


})

