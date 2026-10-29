import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** Floating glossy shapes in brand colours. Lazy-loaded from Hero. Fewer shapes + capped pixel ratio on phones. */
export default function Scene3D() {
  const mount = useRef(null)
  useEffect(() => {
    const el = mount.current
    const mobile = window.innerWidth < 768
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const css = getComputedStyle(document.documentElement)
    const colors = ['--brand-blue', '--brand-red', '--brand-yellow', '--brand-green'].map(v => css.getPropertyValue(v).trim())
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 50)
    cam.position.z = 8
    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const dl = new THREE.DirectionalLight(0xffffff, 2.2); dl.position.set(3, 5, 6); scene.add(dl)
    const geos = [new THREE.IcosahedronGeometry(1.2, 0), new THREE.TorusGeometry(0.9, 0.35, 24, 48),
      new THREE.OctahedronGeometry(1), new THREE.BoxGeometry(1.3, 1.3, 1.3)]
    const meshes = geos.slice(0, mobile ? 3 : 4).map((g, i) => {
      const m = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ color: colors[i], roughness: 0.15, clearcoat: 1, metalness: 0.1 }))
      m.position.set([-1.6, 1.8, 1.2, -1][i], [1.2, 0.8, -1.4, -1.6][i], [0, -1, 0.5, -0.5][i]); scene.add(m); return m
    })
    let raf; const t0 = performance.now()
    const tick = () => {
      const t = (performance.now() - t0) / 1000
      meshes.forEach((m, i) => { m.rotation.x = t * 0.4 + i; m.rotation.y = t * 0.5; m.position.y += Math.sin(t + i) * 0.003 })
      renderer.render(scene, cam); if (!reduce) raf = requestAnimationFrame(tick)
    }
    tick()
    const onResize = () => { renderer.setSize(el.clientWidth, el.clientHeight); cam.aspect = el.clientWidth / el.clientHeight; cam.updateProjectionMatrix() }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); renderer.dispose(); el.removeChild(renderer.domElement) }
  }, [])
  return <div ref={mount} className="h-full w-full" role="img" aria-label="Floating 3D shapes in the chapter's brand colours" />
}
