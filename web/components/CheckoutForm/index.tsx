import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { gql, useMutation } from '@apollo/client'
const ADD_BALANCE = gql`
  mutation AddBalance($value: Int!) {
    addBalance(value: $value) {
      id
      type
    }
  }
`
export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [addBalance, { data }] = useMutation(ADD_BALANCE)
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: 'Jenny Rosen',
      },
    })

    handlePaymentMethodResult(result)
  }

  const handlePaymentMethodResult = async (result) => {
    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
    } else {
      console.log(result.paymentMethod.id)
      // Otherwise send paymentMethod.id to your server (see Step 3)
      /*const response = await fetch('/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
        }),
      })

      const serverResponse = await response.json()

      handleServerResponse(serverResponse)
    }
  }

  const handleServerResponse = (serverResponse) => {
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
    } else {
      // Show a success message
    }
  }*/
    }
  }
  const handleCardChange = (event) => {
    if (event.error) {
      // Show `event.error.message` in the payment form.
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement onChange={handleCardChange} />
      <input type="text" name="" id="" />
      <button type="submit" disabled={!stripe}>
        Submit Payment
      </button>
    </form>
  )
}
