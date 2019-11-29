<template>
	<div>
		<el-table :data="articles">
			<el-table-column prop="title" label="标题" width="120"></el-table-column>
			<el-table-column prop="body" label="内容" width="240"></el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button @click="show(scope.row.id)" type="text" size="small">查看</el-button>
					<el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
					<el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: []
		};
	},
	created() {
		this.fetch();
	},
	methods: {
		fetch() {
			this.$http.get("articles", this.articles).then(res => {
                this.articles = res.data;
			});
		},
		edit(id) {
			this.$router.push(`/articles/${id}/edit`);
		},
		show(id) {
			this.$router.push(`/articles/${id}/show`);
		},
		remove(id) {
			this.$http.delete(`articles/${id}`).then(() => {
				this.$message({
					message: "文章删除成功！",
					type: "success"
				});
				this.fetch();
			});
		}
	}
};
</script>

<style scoped>
</style>