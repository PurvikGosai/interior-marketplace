"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FurnitureAssemblyScene } from "@/app/components/FurnitureAssemblyScene";

function playImpactSound() {
  const AudioContextConstructor =
    window.AudioContext ??
    (
      window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }
    ).webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  const context = new AudioContextConstructor();

  void context
    .resume()
    .then(() => {
      const now = context.currentTime;
      const masterGain = context.createGain();
      const knockGain = context.createGain();
      const knock = context.createOscillator();
      const glintGain = context.createGain();
      const glint = context.createOscillator();
      const noiseGain = context.createGain();
      const noiseFilter = context.createBiquadFilter();
      const noise = context.createBufferSource();
      const noiseBuffer = context.createBuffer(
        1,
        Math.floor(context.sampleRate * 0.13),
        context.sampleRate,
      );
      const noiseData = noiseBuffer.getChannelData(0);

      for (let index = 0; index < noiseData.length; index += 1) {
        noiseData[index] = Math.random() * 2 - 1;
      }

      masterGain.gain.setValueAtTime(0.72, now);
      masterGain.connect(context.destination);

      knock.type = "sine";
      knock.frequency.setValueAtTime(142, now);
      knock.frequency.exponentialRampToValueAtTime(72, now + 0.18);
      knockGain.gain.setValueAtTime(0.0001, now);
      knockGain.gain.exponentialRampToValueAtTime(0.95, now + 0.008);
      knockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      knock.connect(knockGain);
      knockGain.connect(masterGain);

      glint.type = "triangle";
      glint.frequency.setValueAtTime(1680, now);
      glint.frequency.exponentialRampToValueAtTime(740, now + 0.09);
      glintGain.gain.setValueAtTime(0.0001, now);
      glintGain.gain.exponentialRampToValueAtTime(0.34, now + 0.004);
      glintGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
      glint.connect(glintGain);
      glintGain.connect(masterGain);

      noise.buffer = noiseBuffer;
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 1840;
      noiseFilter.Q.value = 0.8;
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.22, now + 0.004);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      knock.start(now);
      knock.stop(now + 0.25);
      glint.start(now);
      glint.stop(now + 0.12);
      noise.start(now);
      noise.stop(now + 0.14);

      window.setTimeout(() => void context.close(), 420);
    })
    .catch(() => void context.close());
}

export function BrandIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const soundTimer = window.setTimeout(playImpactSound, 2420);
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 4480);
    const removeTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setIsVisible(false);
    }, 5560);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(soundTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-label="True Designs is loading"
      aria-live="polite"
      className={`brand-intro ${isLeaving ? "brand-intro--leaving" : ""}`}
    >
      <FurnitureAssemblyScene />
      <div className="brand-intro__grid" />
      <div className="brand-intro__pendant" aria-hidden="true">
        <span className="brand-intro__pendant-cord" />
        <span className="brand-intro__pendant-shade" />
        <span className="brand-intro__pendant-bulb" />
        <span className="brand-intro__pendant-glow" />
      </div>
      <div className="brand-intro__warmth" />
      <div className="brand-intro__stage">
        <div className="brand-intro__lockup">
          <div className="brand-intro__logo-shell">
            <Image
              alt="True Designs logo"
              className="object-cover"
              fill
              priority
              sizes="152px"
              src="/true-designs-logo.jpeg"
            />
          </div>
          <p className="brand-intro__wordmark">True Designs</p>
          <p className="brand-intro__caption">Interior marketplace</p>
        </div>
      </div>
    </div>
  );
}
