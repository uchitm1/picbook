const posts = async (parent, _args, context) => {
	const allPosts = await context.prisma.user
		.findUnique({ where: { id: parent.id } })
		.posts();
	return allPosts;
};

module.exports = {
	posts,
};
