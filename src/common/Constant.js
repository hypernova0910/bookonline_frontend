export default class Constants {
    static API_URL = 'http://localhost:9001/'
    static IMAGE_URL = 'http://localhost:9001/getImage/'

    static PHONE_REGEX = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/i
    static EMAIL_REGEX = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i
}