export default PasswordsSchema = new SimpleSchema({
    password: {
        type: String,
        min: 8
    },
    passwordRepeat: {
        type: String,
        custom: function() {
            if (this.value !== this.field('password').value) {
                return 'passwordMismatch';
            }
        }
    }
});
