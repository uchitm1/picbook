const createdBy = async (parent, _args, context) => {
	const user = await context.prisma.post
		.findUnique({
			where: { id: parent.id },
		})
		.createdBy();
	return user;
};

module.exports = {
	createdBy,
};
