
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const md5 = require('md5')
admin.initializeApp()


exports.setPaymentInfo = functions.https.onRequest(async (req, res)=>{

    const amount = req.body.value
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


    const user = req.body.extra1
    const cart = JSON.parse(req.body.extra2)
    const apikey = "4Vj8eK4rloUd272L48hsrarnUA"
    const merchantid = req.body.merchant_id
    const reference = req.body.reference_sale
    
    const signature = req.body.sign
    const status = req.body.state_pol
    const rSignature = `${apikey}~${merchantid}~${reference}~${new_price}~COP~${status}`
    const md5Signature = md5(rSignature)

    const userRef = admin.database().ref(`/Users/${user}`)

    const queryCourses = await userRef.child("/courses").once("value")
    const queryPurchases = await userRef.child("/purchases").once("value")

    const courseResponse = queryCourses.val()
    const purchasesResponse = queryPurchases.val()
    let new_courses = [courseResponse]
    let new_purchases = [purchasesResponse]

    
    if(new_courses){
        new_courses = cart
    }
    else{
        cart.map( item => { 
            if(!courseResponse.includes(item)){
                new_courses.push(item)
            }
            
        } ) 
    }



    if(new_purchases){
        new_purchases = reference
    }
    else{
        new_purchases = [...purchasesResponse, reference]
    }
    

    const userInfo = {
        courses: new_courses,
        purchases: new_purchases
    }


    if(signature === md5Signature){
        admin.database().ref(`/Users/${user}`).update(userInfo)
        .then(response => res.status(200).send("cursos actualizados correctamente"))
        .catch(error => res.status(500).send("error 500 contacte el administrador del sistema"))
    }
    else{
        res.status(404).send("Error")
    }

    res.end()
})

