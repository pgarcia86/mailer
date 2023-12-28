//const express = require('express)     //CommonJs

import express from 'express'           //Module
import path from 'path'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

sgMail.setApiKey(process.env.SGKEY)

app.use(express.json())
app.use(express.static('app'))

app.get('/', (req, res) => {
    res.sendFile(`${path.resolve()}/index.html`)
    
    // const msg = {
    // to: 'pgarciabarros86@gmail.com', // Change to your recipient
    // from: process.env.FROM, // Change to your verified sender
    // subject: 'Sending with SendGrid is Fun',
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // }
    // sgMail
    // .send(msg)
    // .then(() => {
    //     console.log('Email sent')
    // })
    // .catch((error) => {
    //     console.error(error)
    // })
}) 

app.post('/send', async (req, res) => {
    try{
        const {to, subject, html} = req.body
        const message = {
            to,
            from: process.env.FROM,
            subject,
            html,
        }
        await sgMail.send(message)
        res.status(200).send("Correo enviado exitosamente")
    } catch(error){
        console.error("Error al enviar el correo", error);
        res.status(500).send('No se envio el correo')
    }
})

app.listen(3000, () => console.log('The application is running'))