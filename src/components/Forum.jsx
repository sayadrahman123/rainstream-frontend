import React from "react";
import ForumHero from "./ForumHero";
import HotTopics from "./HotTopics";
import DiscussionFeed from "./DiscussionFeed";
import PremiereEvents from "./PremiereEvents";

// 1. Accept the prop here
const Forum = ({ onCreateProfile }) => {
  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
      <ForumHero />
      <HotTopics />

      {/* 2. Pass it down to DiscussionFeed here */}
      <DiscussionFeed onCreateProfile={onCreateProfile} />

      <PremiereEvents />
    </div>
  );
};

export default Forum;
