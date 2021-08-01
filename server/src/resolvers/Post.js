const createdBy = async (parent, _args, context) => {
	const user = await context.prisma.post
		.findUnique({
			where: { id: parent.id },
		})
		.createdBy();
	return user;
};

const likes = async (parent, _args, context) => {
	const likes = await context.prisma.post
		.findUnique({ where: { id: parent.id } })
		.likes();
	return likes;
};

module.exports = {
	createdBy,
	likes,
};
