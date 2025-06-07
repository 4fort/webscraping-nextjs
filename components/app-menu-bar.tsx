"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AppMenuBar() {
  return (
    <Menubar>
      <FileMenu />
      <ViewMenu />
      <AboutMenu />
    </Menubar>
  );
}

function FileMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarSub>
          <MenubarSubTrigger>Export</MenubarSubTrigger>
          <MenubarPortal>
            <MenubarSubContent>
              <MenubarItem>Export as PDF</MenubarItem>
              <MenubarItem>Export as CSV</MenubarItem>
            </MenubarSubContent>
          </MenubarPortal>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  );
}

function ViewMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Zoom In{" "}
          <MenubarShortcut>
            <pre className="inline bg-accent text-accent-foreground px-1 p-0.5 leading-0 rounded-sm">
              ⌘/ctrl
            </pre>
            {" + "}
            <pre className="inline bg-accent text-accent-foreground px-1 p-0.5 leading-0 rounded-sm">
              +
            </pre>
          </MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Zoom Out{" "}
          <MenubarShortcut>
            <pre className="inline bg-accent text-accent-foreground px-1 p-0.5 leading-0 rounded-sm">
              ⌘/ctrl
            </pre>
            {" + "}
            <pre className="inline bg-accent text-accent-foreground px-1 p-0.5 leading-0 rounded-sm">
              -
            </pre>
          </MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          Toggle Fullscreen
          <MenubarShortcut>
            <pre className="inline bg-accent text-accent-foreground px-1 p-0.5 leading-0 rounded-sm">
              F11
            </pre>
          </MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

function AboutMenu() {
  const [isAboutAppOpen, setIsAboutAppOpen] = useState(false);
  const [isEthicalConsiderationsOpen, setIsEthicalConsiderationsOpen] =
    useState(false);

  return (
    <MenubarMenu>
      <MenubarTrigger>About</MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => setIsAboutAppOpen(!isAboutAppOpen)}>
          About This App
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem
          onClick={() =>
            setIsEthicalConsiderationsOpen(!isEthicalConsiderationsOpen)
          }
        >
          Ethical Considerations
        </MenubarItem>
      </MenubarContent>
      <AboutAppAlert open={isAboutAppOpen} onOpenChange={setIsAboutAppOpen} />
      <EthicalConsiderationsAlert
        open={isEthicalConsiderationsOpen}
        onOpenChange={setIsEthicalConsiderationsOpen}
      />
    </MenubarMenu>
  );
}

function AboutAppAlert({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>About This App</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <AlertDialogDescription>
            This app is designed to scrape and analyze web pages for educational
            purposes. Made with love by{" "}
            <Button variant="link" className="p-1" asChild>
              <Link
                href="https://github.com/4fort"
                target="_blank"
                rel="noopener noreferrer"
              >
                4fort
              </Link>
            </Button>
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EthicalConsiderationsAlert({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ethical Considerations</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <AlertDialogDescription asChild>
              <h4 className="font-semibold text-foreground mb-2">
                When is web scraping allowed?
              </h4>
            </AlertDialogDescription>
            <ul className="list-disc list-inside space-y-1">
              <li>Scraping publicly available data is generally permissible</li>
              <li>
                Always check the website's Terms of Service and robots.txt
              </li>
              <li>
                Avoid scraping copyrighted content or personal data without
                consent
              </li>
              <li>Rate-limit your requests to avoid overloading servers</li>
            </ul>
          </div>

          <div>
            <AlertDialogDescription asChild>
              <h4 className="font-semibold text-foreground mb-2">
                Respecting robots.txt rules:
              </h4>
            </AlertDialogDescription>
            <ul className="list-disc list-inside space-y-1">
              <li>Check /robots.txt on the target domain before scraping</li>
              <li>Respect "Disallow" directives for your user agent</li>
              <li>Honor "Crawl-delay" specifications</li>
              <li>
                Consider using libraries that automatically check robots.txt
              </li>
            </ul>
          </div>

          <div>
            <AlertDialogDescription asChild>
              <h4 className="font-semibold text-foreground mb-2">
                Legal alternatives for news data:
              </h4>
            </AlertDialogDescription>
            <ul className="list-disc list-inside space-y-1">
              <li>Use official APIs (NewsAPI, Guardian API, NYTimes API)</li>
              <li>RSS/Atom feeds for structured news content</li>
              <li>Content syndication services and press release APIs</li>
              <li>Partner with news organizations for data access</li>
            </ul>
          </div>

          <div>
            <AlertDialogDescription asChild>
              <h4 className="font-semibold text-foreground mb-2">
                Best Practices:
              </h4>
            </AlertDialogDescription>
            <p>
              Always scrape responsibly, respect rate limits, cache data
              appropriately, and consider the impact on the target website's
              resources.
            </p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
