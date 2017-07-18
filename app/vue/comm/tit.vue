<tit>
    <div class="sys-page-tit1">
        <div class="sys-main-top " :class="myclass">
            <h1><span>{{ t1 }}</span></h1>
            <div class="sys-main-com">
                {{t2}}
                <slot></slot>
            </div>
        </div>
    </div>
</tit>
<script>
    this.tit={
        props:['t1','t2','myclass'],
        mounted:function(){
            $('.tag-dn').removeClass('tag-dn')
        }
    }
</script>