import React from "react";
import { getSSHKey } from "../api/inventory";
import { BsCloudDownload } from "react-icons/bs";

const SSHCert = ({ clusterid }) => {
  const handleDownload = async () => {
    try {
      const fileData = await getSSHKey(clusterid);
      const blob = new Blob([fileData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ssh-key.txt";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading SSH key:", error);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={handleDownload}>
        <BsCloudDownload />
      </button>
    </div>
  );
};

export default SSHCert;
