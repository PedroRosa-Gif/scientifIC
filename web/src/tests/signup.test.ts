import { validadePassword } from "../utils/helpers/validadeSignupFields";

beforeAll(() => {});

afterAll(() => {});

describe('Check password', () => {
  
  it('Password and confirm password differect', async () => {

    const password = "abcdef";
    const confirmPassword = "abcdeg";

    expect(validadePassword(password, confirmPassword)).toHaveProperty('message', "Os campos 'senha' e 'confirmar senha' devem ser iguais");
  })
  
  it('Password with less than 8 caracters', async () => {

    const password = "ac";
    const confirmPassword = "ac";

    expect(validadePassword(password, confirmPassword)).toHaveProperty('message', "A senha deve ter pelo menos 8 caracteres");
  })

  it('Password with more than 15 caracters', async () => {

    const password = "senha1234567891011";
    const confirmPassword = "senha1234567891011";

    expect(validadePassword(password, confirmPassword)).toHaveProperty('message', "A senha deve ter menos de 16 caracteres");
  })

  it('Password without special caracter', async () => {

    const password = "senha123";
    const confirmPassword = "senha123";

    expect(validadePassword(password, confirmPassword)).toHaveProperty('message', "A senha precisa ter pelo menos um caracter especial");
  })

  it('Correct password', async () => {

    const password = "senha@123";
    const confirmPassword = "senha@123";

    expect(validadePassword(password, confirmPassword)).toHaveProperty('result', true);
  })
});