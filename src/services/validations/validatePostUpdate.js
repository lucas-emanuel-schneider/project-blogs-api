const { BlogPost } = require('../../models');

const validatePostUpdate = async (idPost, userId) => {
  const post = await BlogPost.findOne({ where: { id: idPost } });
  if (post && post.dataValues.userId !== userId) {
    return { type: 'error', message: 'Unauthorized user' };
    }
  return { type: null, message: 'sucess' };
};

module.exports = { validatePostUpdate };