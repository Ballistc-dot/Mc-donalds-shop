import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../../components/CheckoutForm'
import Layout from '../../components/Layout'
import stripeConfig from '../../config/stripe'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(stripeConfig.STRIPE_SECRET_KEY)

export default function Checkout() {
  return (
    <Layout title="Add Balance">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Layout>
  )
}
