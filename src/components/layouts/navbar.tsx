"use client";
import React, { useState } from "react";
import Logo from "@/components/ui/logo";
import {
  Menu,
  X,
  Globe,
  Search,
  ExternalLink,
  LayoutDashboard,
  HeartHandshake,
} from "lucide-react";
import { useLocale } from "next-intl";
import { ThemeSwitcher } from "@/components/molecules/theme-switcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useMobileNavbar } from "@/context/MobileNavbarContext";
import { Link, usePathname } from "../../navigation";
import { useTranslations } from "next-intl";
import { UrlObject } from "url";

type NavItem = {
  title: string;
  href?: string | UrlObject;
  icon: React.ReactNode;
  hoverText?: string;
};

const Navbar = ({}) => {
  const { showNavbar, setShowNavbar } = useMobileNavbar();
  const [openDropdown, setOpenDropdown] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();

  const generateLocaleUrl = () => {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts[0] === "en" || pathParts[0] === "my") {
      pathParts.shift();
    }
    const newPath = `/${pathParts.join("/")}`;
    return newPath;
  };

  const navItem: NavItem[] = [
    {
      title: `${t("HeaderSection.search")}`,
      href: "/",
      icon: <Search className="w-5 h-5" />,
    },
    {
      title: `${t("HeaderSection.donate")}`,
      icon: <HeartHandshake className="w-5 h-5" />,
      hoverText: "এখনো কোনো ভালো মাধ্যম পাইনি, তবে পেলেই জানাবো।",
    },
  ];

  return (
    <>
      {/* desktop view */}
      <div className="hidden lg:block fixed w-full top-0 z-50">
        <nav className="bg-white/80 backdrop-blur-xl px-2 w-full  dark:bg-gray-900/80">
          <div className="flex flex-1 flex-row justify-between items-center">
            <Logo />
            <div className="flex items-center">
              {navItem.map((item, index) => (
                <div key={index} className="relative group">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`text-sm px-3 font-semibold w-full flex items-center space-x-2 hover:scale-110 transition duration-300 ease-in-out ${
                        pathname === item.href ? "text-red-500" : ""
                      }`}
                    >
                      {item.icon}
                      <p>{item.title}</p>
                    </Link>
                  ) : (
                    <div className="text-sm px-3 font-semibold w-full flex items-center space-x-2 hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
                      {item.icon}
                      <p>{item.title}</p>
                      {item.hoverText && (
                        <div className="absolute hidden group-hover:block top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 text-sm whitespace-nowrap z-50">
                          {item.hoverText}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <ThemeSwitcher />
              {locale !== "en" ? (
                <div onClick={() => setShowNavbar(false)}>
                  <Link
                    href={generateLocaleUrl()}
                    className={`text-sm font-semibold px-5 py-5 w-full flex items-center space-x-2 hover:scale-110 transition duration-300 ease-in-out`}
                    locale="en"
                  >
                    <Globe className="w-5 h-5" />
                    <p>English</p>
                  </Link>
                </div>
              ) : (
                <div onClick={() => setShowNavbar(false)}>
                  <Link
                    href={generateLocaleUrl()}
                    className={`text-sm font-semibold px-5 py-5 w-full flex items-center space-x-2 hover:scale-110 transition duration-300 ease-in-out`}
                    locale="my"
                  >
                    <Globe className="w-5 h-5" />
                    <p>Bangla</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* mobile view */}
      <div className="block lg:hidden fixed w-full z-50">
        <nav className="w-full shadow-md">
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl w-full px-2 dark:bg-gray-900/80">
            <Logo />
            <div className="flex items-center space-x-5">
              <ThemeSwitcher />
              {!showNavbar ? (
                <button
                  type="button"
                  className="bg-black p-1.5 text-white rounded-lg"
                  onClick={() => setShowNavbar(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-black p-1.5 text-white rounded-lg"
                  onClick={() => setShowNavbar(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          {showNavbar ? (
            <div className="fixed inset-0 z-50 top-[6%] w-full bg-white dark:bg-background">
              <div>
                {navItem.map((item, index) => (
                  <div className="border-b px-5 py-5" key={index}>
                    {item.href ? (
                      <Link
                        onClick={() => setShowNavbar(false)}
                        href={item.href}
                        className={`text-sm font-semibold w-full flex items-center space-x-2 ${
                          pathname === item.href
                            ? "text-red-500 font-semibold"
                            : ""
                        }`}
                      >
                        {item.icon}
                        <p>{item.title}</p>
                      </Link>
                    ) : (
                      <div>
                        <div className="text-sm font-semibold w-full flex items-center space-x-2">
                          {item.icon}
                          <p>{item.title}</p>
                        </div>
                        {item.hoverText && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {item.hoverText}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  {locale !== "en" ? (
                    <div
                      onClick={() => setShowNavbar(false)}
                      className="border-b"
                    >
                      <Link
                        href={generateLocaleUrl()}
                        className={`text-sm font-semibold px-5 py-5 w-full flex items-center space-x-2`}
                        locale="en"
                      >
                        <Globe className="w-5 h-5" />
                        <p>English</p>
                      </Link>
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowNavbar(false)}
                      className="border-b"
                    >
                      <Link
                        href={generateLocaleUrl()}
                        className={`text-sm font-semibold px-5 py-5 w-full flex items-center space-x-2`}
                        locale="my"
                      >
                        <Globe className="w-5 h-5" />
                        <p>Bangla</p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </>
  );
};

export default Navbar;