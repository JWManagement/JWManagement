import SimpleSchema from 'simpl-schema'

const PasswordsSchema = new SimpleSchema({
  password: {
    type: String,
    min: 8
  },
  passwordRepeat: {
    type: String,
    custom () {
      if (this.value !== this.field('password').value) {
        return 'passwordMismatch'
      }
    }
  }
})

export default PasswordsSchema
