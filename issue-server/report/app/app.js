const app = new Vue ({
    el: '#app',
    data: function() {
        return {
            requiredFieldsMessage: '',
            showStatusModal: false,
            modalText: null,
        }
    },
    methods: {
        async reportIssue(e) {
            e.preventDefault();
            const theForm = this.$refs.theForm;
            const formData = new FormData(theForm);
            const response = await fetch(`/report-issue`, {
                method: 'POST',
                // mode: 'cors',
                cache: 'no-cache',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: formData
            });
            if(response.status === 200) {
                this.$refs.theForm.reset();
                const result = await response.json();
                this.modalText = {message: result.message, id: result.id};
                this.showModal();
                return;
            }
            if(response.status === 400) {
                const result = await response.json();
                if(result && result.message !== undefined) {
                    this.requiredFieldsMessage = result.message;
                }
                return;
            }
        },
        showModal() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
            document.body.style.overflowY = 'hidden';
            this.showStatusModal = true;
        },
        hideModal() {
            document.body.removeAttribute('style');
            this.showStatusModal = false;
            this.modalText = null;
        }
    
    },
})