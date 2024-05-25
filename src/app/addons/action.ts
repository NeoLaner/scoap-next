"use server";
import { api } from "~/trpc/server";
import AddonService from "~/app/_services/addon/addonService";
import { type Addon } from "~/lib/@types/Addons";

export async function addAddon(formData: FormData) {
  let transportUrl = formData.get("transportUrl") as string;
  if (!transportUrl) return;

  const { hash } = new URL(transportUrl);
  if (hash) {
    const [, encodedAddonUrl] = hash.split("addon=");
    if (encodedAddonUrl) transportUrl = decodeURIComponent(encodedAddonUrl);
  }
  const addon = (await AddonService.detectFromURL(transportUrl)) as Addon;

  if (!addon.transportUrl) throw new Error("failed to find addon");

  await api.addon.addAddon({ transportUrl: addon.transportUrl });
}
