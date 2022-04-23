const { topAdmin } = require("../../utils/constants");
const User = require("../../models/user.model");
const { removeObjectField } = require("../../utils/manipulators/object");

module.exports = async () => {
  try {
    // Look for the user
    const user = await User.findOne({ userId: topAdmin.userId });

    // Only create the user if user doesn't already exist
    if (!user) {
      await User.create(topAdmin);
    }

    const credentialsDisplayed = removeObjectField(topAdmin, (user) => {
      return {
        name: user.name,
        userId: user.userId,
        email: user.email,
      };
    });

    console.log("Admin user details -> \n", credentialsDisplayed);
  } catch (err) {
    console.log(
      "Unable to initialize the user due to the following error -> \n",
      err.message
    );
  }
};
