import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutForm from '../../components/CheckoutForm'
import Layout from '../../components/Layout'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_CLIENT_SECRET)

export default function Checkout() {
  return (
    <Layout title="add balance">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Layout>
  )
}
