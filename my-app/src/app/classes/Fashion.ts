export class Fashion{
    constructor(
        public _id:any=null,
        public style:string="",
        public fashion_subject:string="",
        public fashion_detail:string="",
        public fashion_image:string="",
        public IdF:number=0){}

    getBase64String(): string {
        return this.fashion_image;
    }
}


