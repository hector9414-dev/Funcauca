import React from 'react'
import md5 from 'md5'
import { useState } from 'react'
import Logo from '../../img/logo-no-text-.png'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { flushCart } from '../../Redux/actionCreator'

const Payment = ({flushcart}) => {

    const urlParams = new URLSearchParams (window.location.search)
    const response = []
        for(var pair of urlParams.entries()) {
            response[pair[0]] = pair[1]
         }
    const apikeytest = "4Vj8eK4rloUd272L48hsrarnUA"
    const paymentData = {...response}
    const {merchantId,transactionState,message,referenceCode,reference_pol,transactionId,description,trazabilityCode,signature,TX_VALUE,processingDate} = paymentData
    
    let new_price


    const new_val = parseInt(TX_VALUE)
    const intDecimals = Math.round((TX_VALUE - new_val)*100)
    const intFirstDecimal = Math.round(parseInt(intDecimals/10))
    const intSecondDecimal = Math.round(intDecimals % 10)

   

    if((intFirstDecimal % 2) === 0  && intSecondDecimal === 5){
        new_price = `${new_val}.${intFirstDecimal}`
        console.log(new_price)
    }
    else{
        if((intFirstDecimal % 2) === 1  && intSecondDecimal === 5){
            new_price = `${new_val}.${intFirstDecimal+1}`
        }
        else{
            if(intSecondDecimal >= 5){
                new_price = `${new_val}.${intFirstDecimal+1}`
            }
            else{
                new_price = `${new_val}.${intFirstDecimal}`
            }
        }
    }


    const hash = `${apikeytest}~${merchantId}~${referenceCode}~${new_price}~COP~${transactionState}`
    const sign = md5(hash)

    useState(()=>{
        flushcart()
    })

    return (
                <main className="m-50 m-to-center l-30 tx-container">
                {
                sign === signature ?
                <>
                    <h2 className="center">Resumen de la transaccion</h2>
                    <img src={Logo} alt="logo" className="main-logo tx-logo s-to-center"/>
                    <div className="ed-grid">
                        <div className="ed-grid s-grid-2">
                           <p className="tx-item">Estado de la transaccion:</p>
                           <p className="tx-item">{message}</p>
                        </div>
                        <div className="ed-grid s-grid-2">
                            <p className="tx-item">Referencia de compra:</p>
                           <p className="tx-item">{referenceCode}</p>
                        </div>
                        <div className="ed-grid s-grid-2">
                            <p className="tx-item">Numero de transaccion PayU:</p>
                           <p className="tx-item">{reference_pol}</p>
                        </div>
                        <div className="ed-grid s-grid-2">
                            <p className="tx-item">Identificacion de la transaccion:</p>
                           <p className="tx-item">{transactionId}</p>
                        </div>
                        <div className="ed-grid s-grid-2">
                            <p className="tx-item">Descripcion de la compra: </p>
                           <p className="tx-item">{description}</p>
                        </div>
                        <div className="ed-grid s-grid-2">
                            <p className="tx-item">Codigo de trazabilidad:</p>
                           <p className="tx-item">{trazabilityCode}</p>
                        </div>
                        <div className="ed-grid s-grid-2">
                            <p className="tx-item">Valor:</p>
                           <p className="tx-item">{TX_VALUE} COP</p>
                        </div>
                        <div className="ed-grid s-grid-2">
                           <p className="tx-item">Fecha de la transaccion:</p>
                           <p className="tx-item">{processingDate}</p>
                        </div>
                </div>
                <Link to="/dashboard">
                <Button variant="success" block>Continuar</Button>
                </Link>
                </>
                :
                window.location.assign("/")
                }
                </main>
    )
}

const mapDispatchToProps = dispatch =>({
    
    flushcart(){
        dispatch( flushCart() )
    }


})
const mapStateToProps = () =>({})


export default connect(mapStateToProps, mapDispatchToProps )(Payment)
