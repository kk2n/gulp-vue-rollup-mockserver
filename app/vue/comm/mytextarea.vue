<mytextarea>
    <div class="mytext" :class="text_css"></div>
</mytextarea>
<script>
    this.mytextarea={
        props:['text_css'],
        mounted(){
            let quill = new Quill('.mytext', {
                modules: {
                    toolbar: [
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline','image', 'code-block',{ 'color': [] }, { 'background': [] }]
                    ]
                },
                placeholder: '请填写内容！',
                theme: 'snow'  // or 'bubbless'
            });
            $('.ql-picker-label:eq(2)').css('margin-top','-6px');
        }
    }
</script>