const post = async (parent, _args, context) => {
	const likedPost = await context.prisma.like
		.findUnique({ where: { id: parent.id } })
		.post();
	return likedPost;
};

const user = async (parent, _args, context) => {
	const likedBy = await context.prisma.like
		.findUnique({ where: { id: parent.id } })
		.user();
	return likedBy;
};

module.exports = {
	post,
	user,
};
