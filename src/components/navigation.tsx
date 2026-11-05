"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { site } from "@/content/site";
import { Brand } from "./brand";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
      const first = links[0];
      const last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); toggle.current?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); toggle.current?.focus();
      } else if (document.activeElement === toggle.current) {
        event.preventDefault(); (event.shiftKey ? last : first)?.focus();
      }
    };
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => setOpen(false);
    breakpoint.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", closeOnEscape);
      breakpoint.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function close() { setOpen(false); }

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <a href="#inicio" className="brand-link" aria-label="Loomy, início" onClick={close}><Brand /></a>
        <nav className="desktop-navigation" aria-label="Navegação principal">
          {site.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="nav-contact" href="#contato">Vamos conversar <ArrowUpRightIcon size={17} aria-hidden /></a>
        <button
          ref={toggle} type="button" className="menu-toggle"
          aria-expanded={open} aria-controls="mobile-navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >{open ? <XIcon size={25} aria-hidden /> : <ListIcon size={25} aria-hidden />}</button>
      </div>
      <nav ref={menu} id="mobile-navigation" className={`mobile-navigation ${open ? "is-open" : ""}`} aria-label="Navegação mobile" hidden={!open}>
        {site.navigation.map((item) => <a key={item.href} href={item.href} onClick={close}>{item.label}<ArrowUpRightIcon size={26} aria-hidden /></a>)}
        <a href="#contato" onClick={close}>Vamos conversar<ArrowUpRightIcon size={26} aria-hidden /></a>
        <span>Produção, design e marketing.</span>
      </nav>
    </header>
  );
}
