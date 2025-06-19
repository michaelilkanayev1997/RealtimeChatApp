import { useEffect } from "react";

import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import {
  GET_DM_CONTACTS_ROUTE,
  GET_USER_CHANNELS_ROUTE,
} from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";
import CreateChannel from "./components/create-channel";

const ContactsContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    channels,
    setChannels,
  } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE);

      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE);

      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };

    getChannels();
    getContacts();
  }, [setChannels, setDirectMessagesContacts]);

  return (
    <div
      className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] 
    border-r-2 border-[#2f303b] w-full"
    >
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>

      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-[#2c2d38]">
      {/* Clean, modern chat icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7l-4 4V5z" />
      </svg>

      {/* Wordmark */}
      <span className="text-xl font-bold text-white tracking-tight">
        ChatApp
      </span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
