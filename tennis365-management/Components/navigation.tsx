"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const path = usePathname();


  return (
    <nav>
      <ul>
        <li>
            <Link href='/'>Home</Link> {path === '/' ? "😀" : ''}
        </li>
        <li>
            <Link href='/win-rate'>승률 계산기</Link> {path === '/win-rate' ? "😀" : ''}
        </li>
      </ul>
    </nav>
  );
}
