const users = async (_parent, _args, context) => {
	const users = await context.prisma.user.findMany();
	return users;
};

const user = async (_parent, args, context) => {
	const user = await context.prisma.user.findUnique({
		where: { id: parseInt(args.id) },
	});
	return user;
};

const posts = async (_parent, _args, context) => {
	const posts = await context.prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
	return posts;
};

const post = async (_parent, args, context) => {
	const post = await context.prisma.post.findUnique({
		where: { id: parseInt(args.id) },
	});
	return post;
};

const postsByUserId = async (_parent, _args, context) => {
	const posts = await context.prisma.post.findMany({
		where: { createdById: parseInt(context.req.session.userId) },
	});
	return posts;
};

module.exports = {
	users,
	user,
	posts,
	post,
	postsByUserId,
};
