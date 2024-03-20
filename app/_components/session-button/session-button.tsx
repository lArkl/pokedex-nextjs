"use client";

import { FC } from "react";
import Button from "../Button";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface SessionButtonProps {
  isLoggedIn: boolean;
  className?: string;
}

const SessionButton: FC<SessionButtonProps> = ({ isLoggedIn, className }) => {
  return isLoggedIn ? (
    <Button
      size="small"
      variant="secondary"
      className={className}
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  ) : (
    <Link href="/login">
      <Button
        size="small"
        variant="secondary"
        className={className}
        type="button"
      >
        Login
      </Button>
    </Link>
  );
};

export default SessionButton;
