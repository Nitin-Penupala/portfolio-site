'use client';

import { useRef, useEffect, useCallback } from 'react';

export default function DottedGlowBackground({
    gap = 24,
    radius = 1,
    color = 'rgba(255,255,255,0.25)',
    glowColor = 'rgba(255,255,255,0.8)',
    glowRadius = 18,
    speedMin = 2000,
    speedMax = 5000,
    glowChance = 0.04,
}) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const dotsRef = useRef([]);

    const buildDots = useCallback(
        (w, h) => {
            const dots = [];
            for (let x = gap; x < w; x += gap) {
                for (let y = gap; y < h; y += gap) {
                    const isGlowing = Math.random() < glowChance;
                    dots.push({
                        x,
                        y,
                        glowing: isGlowing,
                        phase: Math.random() * Math.PI * 2,
                        speed:
                            speedMin +
                            Math.random() * (speedMax - speedMin),
                        nextToggle:
                            Date.now() +
                            Math.random() *
                            (speedMin + Math.random() * (speedMax - speedMin)),
                    });
                }
            }
            return dots;
        },
        [gap, glowChance, speedMin, speedMax],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dotsRef.current = buildDots(rect.width, rect.height);
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const { width, height } = canvas.parentElement.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);
            const now = Date.now();

            for (const dot of dotsRef.current) {

                if (now > dot.nextToggle) {
                    dot.glowing = !dot.glowing;
                    dot.nextToggle =
                        now + speedMin + Math.random() * (speedMax - speedMin);
                    dot.phase = 0;
                    dot.speed =
                        speedMin + Math.random() * (speedMax - speedMin);
                }


                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();


                if (dot.glowing) {
                    const elapsed = now - (dot.nextToggle - dot.speed);
                    const t = Math.min(elapsed / dot.speed, 1);

                    const ease = 0.5 - 0.5 * Math.cos(t * Math.PI);
                    const r = radius + (glowRadius - radius) * ease;
                    const alpha = 0.7 * ease;

                    const grad = ctx.createRadialGradient(
                        dot.x,
                        dot.y,
                        0,
                        dot.x,
                        dot.y,
                        r,
                    );
                    grad.addColorStop(0, glowColor);
                    grad.addColorStop(1, 'transparent');
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
                    ctx.fillStyle = grad;
                    ctx.globalAlpha = alpha;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animRef.current);
        };
    }, [buildDots, color, glowColor, glowRadius, radius, speedMin, speedMax]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
