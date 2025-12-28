import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../services/userService"; // Import service
import ForumHero from "../components/ForumHero";
import HotTopics from "../components/HotTopics";
import DiscussionFeed from "../components/DiscussionFeed";
import PremiereEvents from "../components/PremiereEvents";
import EditProfileModal from "../components/EditProfileModal"; // Import Modal
import Footer from "../components/Footer";

const Forum = () => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check login status
  const isLoggedIn = !!localStorage.getItem("token");

  // Fetch user data on mount (so we have it ready for the modal)
  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        try {
          const userData = await getMyProfile();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user for forum", error);
        }
      }
    };
    fetchUser();
  }, [isLoggedIn]);

  const handleCreateProfileClick = () => {
    if (isLoggedIn) {
      // If logged in, open the Edit Modal to complete profile
      setIsEditOpen(true);
    } else {
      // If not logged in, go to Register page
      navigate("/register");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
      <ForumHero />
      <HotTopics />

      {/* Pass our new handler to the Feed */}
      <DiscussionFeed
        onCreateProfile={handleCreateProfileClick}
        handleLogin={handleLoginClick}
      />

      <PremiereEvents />
      <Footer />

      {/* Conditionally Render the Modal */}
      {isEditOpen && user && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={(updatedUser) => {
            setUser(updatedUser); // Update local state
            // Optionally: You could reload the page or trigger a refresh in DiscussionFeed
            // window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default Forum;
