"use client"
import { AnimatePresence, motion } from "framer-motion"

type ImageModalProps = {
    isOpen: boolean
    onClose: () => void
    src: string
    alt: string
}

export function ImageModal({ isOpen, onClose, src, alt }: ImageModalProps) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <motion.img
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        src={src}
                        alt={alt}
                        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}