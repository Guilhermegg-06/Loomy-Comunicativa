"use client";

import { useState } from "react";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { services } from "@/content/site";

export function Services() {
  const [active, setActive] = useState<string | null>("producao");

  return (
    <div className="service-list">
      {services.map((service) => {
        const expanded = active === service.id;
        return (
          <article className={`service ${expanded ? "is-active" : ""}`} key={service.id}>
            <h3>
              <button type="button" id={`service-button-${service.id}`} aria-expanded={expanded} aria-controls={`service-panel-${service.id}`} onClick={() => setActive(expanded ? null : service.id)}>
                <span>{service.name}</span>
                <span className="service-phrase">{service.phrase}</span>
                <span className="service-arrow">{expanded ? <ArrowDownRightIcon size={30} aria-hidden /> : <ArrowUpRightIcon size={30} aria-hidden />}</span>
              </button>
            </h3>
            <div id={`service-panel-${service.id}`} role="region" aria-labelledby={`service-button-${service.id}`} className="service-panel" hidden={!expanded}>
              <div className={`service-art service-art-${service.visual}`} aria-hidden="true">
                {service.visual === "frame" ? <><i /><span>REC</span><div className="frame-play">↗</div></> : null}
                {service.visual === "type" ? <><span>Aa</span><i /></> : null}
                {service.visual === "orbit" ? <><i /><i /><span>↗</span></> : null}
              </div>
              <div className="service-details">
                <p>{service.description}</p>
                <ul>{service.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}</ul>
                <a className="text-link" href="#contato">Vamos conversar <ArrowUpRightIcon size={19} aria-hidden /></a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
