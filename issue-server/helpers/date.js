class CustomDateTime {
    constructor(date) {
        this.d = date ? new Date(date) : new Date();
        this.formatedDate = [
            this.d.getUTCFullYear(), 
            (this.d.getUTCMonth() + 1) < 9 ? '0'+ (this.d.getUTCMonth() + 1)  : (this.d.getUTCMonth() + 1) , 
            this.d.getUTCDate() < 9 ? '0' + this.d.getUTCDate() : this.d.getUTCDate()
        ];
        this.formatedTime = [
            this.d.getUTCHours() < 9 ?  '0' + this.d.getUTCHours() : this.d.getUTCHours() ,
            this.d.getUTCMinutes() < 9 ? '0' + this.d.getUTCMinutes() : this.d.getUTCMinutes(),
            this.d.getUTCSeconds() < 9 ? '0' + this.d.getUTCSeconds() : this.d.getUTCSeconds()
        ];
    }

    yyyy_mm_dd(separator) {
        return this.formatedDate.join(separator);
    }

    hh_mm_ss(separator) {
        return this.formatedTime.join(separator);
    }
}

module.exports = {
    CustomDateTime
}