"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "chmk-splash-seen";

/** Cok kisa (~1.2 sn) acilis ekrani; oturum basina bir kez gosterilir. */
export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setShow(false);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f1e8]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/images/logo.png"
              alt="CHMK"
              width={220}
              height={92}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
