"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import PrefetchLink from "@/components/utils/prefetch-link";

const PageNavbar = () => {
    const pathname = usePathname();
    const [scrollY, setScrollY] = useState(0);
    const [activeLineStyle, setActiveLineStyle] = useState({ width: 0, left: 0 });
    const [hoverLineStyle, setHoverLineStyle] = useState({ width: 0, left: 0, opacity: 0 });

    // Refs for navigation items
    const navRefs = {
        "/": useRef<HTMLLIElement>(null),
        "/create-challenge": useRef<HTMLLIElement>(null),
        "/xp": useRef<HTMLLIElement>(null),
        "/challengers": useRef<HTMLLIElement>(null),
        "/my-gym": useRef<HTMLLIElement>(null),
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update active line position based on pathname
    useEffect(() => {
        const updateActiveLinePosition = () => {
            let activeRef = null;

            // Determine active ref based on pathname
            if (pathname === "/") {
                activeRef = navRefs["/"];
            } else if (pathname.includes("/create-challenge")) {
                activeRef = navRefs["/create-challenge"];
            } else if (pathname === "/xp") {
                activeRef = navRefs["/xp"];
            } else if (pathname === "/challengers") {
                activeRef = navRefs["/challengers"];
            } else if (pathname.includes("/my-gym")) {
                activeRef = navRefs["/my-gym"];
            }

            if (activeRef && activeRef.current) {
                const element = activeRef.current;
                const rect = element.getBoundingClientRect();
                const navContainer = element.parentElement;

                if (navContainer) {
                    const containerRect = navContainer.getBoundingClientRect();
                    setActiveLineStyle({
                        width: rect.width,
                        left: rect.left - containerRect.left,
                    });
                }
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(updateActiveLinePosition, 100);

        // Update on window resize
        const handleResize = () => updateActiveLinePosition();
        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, [pathname]);

    // Calculate padding-left based on scroll value (max 22px)
    const dynamicPadding = Math.min(scrollY * 0.5, 22);

    console.log({dynamicPadding});
    

    // Handle hover for navigation items
    const handleNavHover = (navKey: string) => {
        const activeRef = navRefs[navKey as keyof typeof navRefs];
        if (activeRef && activeRef.current) {
            const element = activeRef.current;
            const rect = element.getBoundingClientRect();
            const navContainer = element.parentElement;

            if (navContainer) {
                const containerRect = navContainer.getBoundingClientRect();
                setHoverLineStyle({
                    width: rect.width,
                    left: rect.left - containerRect.left,
                    opacity: 1,
                });
            }
        }
    };

    // Handle mouse leave from navigation
    const handleNavLeave = () => {
        setHoverLineStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <div id="page-navbar" className="sticky top-[0px] z-50 bg-white shadow-[0_4px_8px_rgba(0,0,0,0.025)]  pt-1 sm:pt-5 pb-3" style={{ paddingLeft: `${dynamicPadding}px` }}>
            <div className="container-fluid">
                <nav id="navbar" className="hidden relative sm:block z-10">
                    <ul className="flex items-center gap-2 text-sm">
                        <li
                            ref={navRefs["/"]}
                            style={{ color: pathname === "/" ? "#000" : "" }}
                            className="text-[#A7A7A7] relative hover:text-black cursor-pointer font-[500] transition-all duration-300"
                            onMouseEnter={() => handleNavHover("/")}
                            onMouseLeave={handleNavLeave}
                        >
                            <PrefetchLink className="px-3" href={"/"}>
                                Dashboard
                            </PrefetchLink>
                        </li>
                        <li
                            ref={navRefs["/create-challenge"]}
                            style={{ color: pathname.includes("/create-challenge") ? "#000" : "" }}
                            className="text-[#A7A7A7] relative hover:text-black cursor-pointer font-[500] transition-all duration-300"
                            onMouseEnter={() => handleNavHover("/create-challenge")}
                            onMouseLeave={handleNavLeave}
                        >
                            <PrefetchLink className="px-3" href={"/create-challenge"}>
                                Create Challenge
                            </PrefetchLink>
                        </li>
                        <li
                            ref={navRefs["/xp"]}
                            style={{ color: pathname === "/xp" ? "#000" : "" }}
                            className="text-[#A7A7A7] relative hover:text-black cursor-pointer font-[500] transition-all duration-300"
                            onMouseEnter={() => handleNavHover("/xp")}
                            onMouseLeave={handleNavLeave}
                        >
                            <PrefetchLink className="px-3" href={"/xp"}>
                                Rewards
                            </PrefetchLink>
                        </li>
                        <li
                            ref={navRefs["/challengers"]}
                            style={{ color: pathname === "/challengers" ? "#000" : "" }}
                            className="text-[#A7A7A7] relative hover:text-black cursor-pointer font-[500] transition-all duration-300"
                            onMouseEnter={() => handleNavHover("/challengers")}
                            onMouseLeave={handleNavLeave}
                        >
                            <PrefetchLink className="px-3" href={"/challengers"}>
                                Challengers
                            </PrefetchLink>
                        </li>
                        <li
                            ref={navRefs["/my-gym"]}
                            style={{ color: pathname.includes("/my-gym") ? "#000" : "" }}
                            className="text-[#A7A7A7] relative hover:text-black cursor-pointer font-[500] transition-all duration-300"
                            onMouseEnter={() => handleNavHover("/my-gym")}
                            onMouseLeave={handleNavLeave}
                        >
                            <PrefetchLink className="px-3" href={"/my-gym"}>
                                My Gym
                            </PrefetchLink>
                        </li>
                    </ul>
                    <span
                        className="hover-nav-line block h-[calc(100%_+10px)] rounded-[4px] w-full bg-gray-200 absolute top-[-5px] left-0 transition-all duration-300 ease-out -z-10"
                        style={{
                            width: `${hoverLineStyle.width}px`,
                            left: `${hoverLineStyle.left}px`,
                            opacity: hoverLineStyle.opacity,
                        }}
                    ></span>
                    <span
                        className="active-nav-line block h-[2px] bg-black absolute top-[calc(100%_+12px)] transition-all duration-300 ease-out"
                        style={{
                            width: `${activeLineStyle.width}px`,
                            left: `${activeLineStyle.left}px`,
                            opacity: activeLineStyle.width > 0 ? 1 : 0,
                        }}
                    ></span>
                </nav>
            </div>
        </div>
    );
};

export default PageNavbar;
