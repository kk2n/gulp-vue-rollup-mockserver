<ftit>
    <div class="comm-form-title" :class="myclass">
        <span>{{text || t}}</span>
        <em></em>
        <slot></slot>
    </div>
</ftit>
<script>
/*-------------------------------
表单标题
---------------------------------
text||t      表单的标题文字，带下拉三角形和虚线
myclass ||c  样式
*/
this.ftit = {
    props:['text','t','myclass'],
    data(){
        return{
        }
    }
}
</script>