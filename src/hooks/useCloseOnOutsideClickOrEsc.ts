import { useEffect } from 'react';

type Props = {
	isOpenElement: boolean;
	elementRef: React.RefObject<HTMLElement>;
	onClose?: () => void;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpenElement,
	elementRef,
	onClose,
}: Props) => {
	useEffect(() => {
		if (!isOpenElement) return;

		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!elementRef.current?.contains(event.target)
			) {
				onClose?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose?.();
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpenElement, elementRef, onClose]);
};
