<script>

import DOMPurify from 'dompurify';

export default {
    name: 'CreateMixin',
    data() {
        return {
            isLoading: false,
            item: {},
            isEdit: false,
            errors: {},
            api_url: process.env.VUE_APP_API_URL,
            storage: process.env.VUE_APP_API_STORAGE
        };
    },
    methods: {
        submitForm() {
        let uri = this.api_url+this.url+(this.isEdit?'/update':'/store');
        this.isLoading = true;

        if(this.item.ocr_text) {
          const ocrText = this.item.ocr_text;
          const sanitizedOcrText = DOMPurify.sanitize(ocrText);
          const plainText = sanitizedOcrText.replace(/<[^>]+>/g, '');
          this.item.ocr_text = plainText;
        }

        this.axios.post(uri, this.item,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        ).then((response) => {
            this.isLoading = false;
            this.$toast.success(response.data.message, {
              position: "bottom-right",
            });
            this.$refs.btnClose.click();
            this.$root.$emit(this.fetch_module);  
        }).catch((error) => {
          this.isLoading = false;
          if (error.response) {
            if (error.response.status == 422) {
              this.pushErrors(error.response.data.errors);
              this.$toast.error("Please check the form again.", {
                position: "bottom-right",
              });
            }
          }
        });
      },
      pushErrors(errors){
        Object.entries(errors).forEach((element) => {
            let [key,msg] = element;
            this.errors[key] = msg[0];
        });
      }
    },
}
</script>