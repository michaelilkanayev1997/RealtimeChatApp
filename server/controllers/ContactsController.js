import User from "./../models/UserModel.js";

export const searchContacts = async (req, res, next) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).send("search Term is required");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    ); // Escape special characters in the search term

    const regex = new RegExp(sanitizedSearchTerm, "i"); // Create a regular expression with the sanitized search term

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error searching contacts:", error);
    res.status(500).send("Internal server error");
  }
};
