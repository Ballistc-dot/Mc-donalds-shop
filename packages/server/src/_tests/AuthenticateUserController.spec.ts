import { authenticateUserController } from '@domain/useCases/authenticateUser'
import { signAndVerifyTokens } from '../core/helpers/signAndVerifyTokens'

describe('Authenticante an user ', () => {
  const inputData = {
    email: 'pedrobala22@ballistc.com',
    name: 'pedro bala',
    password: '12345678',
    oAuth: false
  }
  it('should be authenticante with correct credentials and return an valid access token', async () => {
    const response = await authenticateUserController.handle(
      inputData.email,
      inputData.password
    )
    const { email } = await signAndVerifyTokens.verify(response)

    expect(email).toBe(inputData.email)
  })
  it("should't  be authenticante with incorrect password", async () => {
    try {
      await authenticateUserController.handle(
        inputData.email,
        inputData.password
      )
    } catch (error: any) {
      expect(error.message).toBe('Incorrect Password, please try again!.')
    }
  })
  it("should't be authenticante without registered email", async () => {
    try {
      await authenticateUserController.handle(
        'pedrobala3@ballistc.com',
        inputData.password
      )
    } catch (error: any) {
      expect(error.message).toBe('This user does not exists!.')
    }
  })
})
