import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");

    setSelectedChatData(contact);

    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => {
        const isSelected =
          selectedChatData && selectedChatData._id === contact._id;

        return (
          <div
            key={contact._id}
            className={`pl-10 py-2 transition-all duration-300 cursor-pointer rounded-md ${
              isSelected
                ? "bg-[#2b2d36] text-white"
                : "hover:bg-[#23242b] text-gray-200"
            }`}
            onClick={() => handleClick(contact)}
          >
            <div className="flex gap-5 items-center">
              {!isChannel && (
                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                  {contact.image ? (
                    <AvatarImage
                      src={`${HOST}/${contact.image}`}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={`uppercase h-10 w-10 text-lg flex items-center justify-center rounded-full ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : getColor(contact.color)
                      }`}
                    >
                      {contact.firstName
                        ? contact.firstName.charAt(0)
                        : contact.email.charAt(0)}
                    </div>
                  )}
                </Avatar>
              )}
              {isChannel && (
                <div className="bg-[#3b3d45] h-10 w-10 flex items-center justify-center rounded-full text-sm text-gray-300">
                  #
                </div>
              )}
              <span className="truncate">
                {isChannel
                  ? contact.name
                  : contact.firstName
                  ? `${contact.firstName} ${contact.lastName}`
                  : contact.email}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
