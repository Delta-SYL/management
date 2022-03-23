<template>
    
</template>

<script>

export default {
    name:'fundList',
    data(){
        return{
            tableData:[]
        }
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            this.$axios.get('/api/profiles/test')
            .then(res=>{
                //this.tableData=res.data
                console.log(res)
            })
            .catch(err=>console.log(err))
        }
    }
}
</script>

<style  scoped>

</style>

