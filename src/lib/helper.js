import { disposableEmails } from "@/constants";

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isDisposableEmail(email) {
  const domain = email.split("@")[1];
  return disposableEmails.has(domain);
}
