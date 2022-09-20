import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
    fullname: Yup.string().required("وارد کردن نام الزامیست !"),
    photo:Yup.string().url("آدرس معتبر نیست !").required("وارد کردن عکس الزامیست !"),
    mobile:Yup.string().required("وارد کردن شماره موبایل الزامیست !"),
    email:Yup.string().email("ایمیل وارد شده معتبر نیست !").required("وارد کردن ایمیل الزامیست !"),
    job:Yup.string().nullable(),
    group:Yup.string().required("انتخاب کردن گروه الزامیست !")
});