import bcrypt from 'bcrypt'
import { signAndVerifyTokens } from '../core/helpers/signAndVerifyTokens'
import { createUserController } from '../domain/useCases/createUser/index'

describe('Create user', () => {
  it('should be a create an user with email and password, with password encription', async () => {
    const inputData = {
      email: 'pedrobala@ballistc.com',
      name: 'pedro bala',
      password: '12345678'
    }
    const response = await createUserController.handle(inputData)
    expect(response).toBeTruthy()

    const AccessToken = response.AccessToken

    const decoded = signAndVerifyTokens.verify(AccessToken)
    const { email }: any = decoded

    const passwords_combine = bcrypt.compare(
      inputData.password,
      response.user.password
    )

    expect(passwords_combine).toBeTruthy()

    expect(email).toBe(inputData.email)
  })
  it('should be a create an user with oAuth', async () => {
    const inputData = {
      email: 'pedrobala3@ballistc.com',
      name: 'pedro bala',
      oAuth: true
    }

    const response = await createUserController.handle(inputData)

    expect(response).toBeTruthy()

    const AccessToken = response.AccessToken

    const decoded = signAndVerifyTokens.verify(AccessToken)
    const { email }: any = decoded

    expect(email).toBe(inputData.email)
  })
})
