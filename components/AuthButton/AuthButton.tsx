import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal, notification, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useRecoilValueLoadable } from 'recoil';
import { addReturnStrategy, connector } from '@/util/connector';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import { useSlicedAddress } from '@/hooks/useSlicedAddress';
import { useTonWallet } from '@/hooks/useTonWallet';
import { useTonWalletConnectionError } from '@/hooks/useTonWalletConnectionError';
import { walletsListQuery } from '@/state/wallets-list';
import { isDesktop, isMobile, openLink } from '@/util/utils';
import styles from './AuthButton.module.css'

const menu = (
	<Menu
		onClick={() => connector.disconnect()}
		items={[
			{
				label: 'Disconnect',
				key: '1',
			},
		]}
	/>
);

export function AuthButton() {
	const [modalUniversalLink, setModalUniversalLink] = useState('');
	const forceUpdate = useForceUpdate();
	const wallet = useTonWallet();
	const onConnectErrorCallback = useCallback(() => {
		setModalUniversalLink('');
		notification.error({
			message: 'Connection was rejected',
			description: 'Please approve connection to the dApp in your wallet.',
		});
	}, []);
	useTonWalletConnectionError(onConnectErrorCallback);

	const walletsList = useRecoilValueLoadable(walletsListQuery);

	const address = useSlicedAddress(wallet?.account.address, wallet?.account.chain);

	useEffect(() => {
		if (modalUniversalLink && wallet) {
			setModalUniversalLink('');
		}
	}, [modalUniversalLink, wallet]);

	const handleButtonClick = useCallback(async () => {
		// Use loading screen/UI instead (while wallets list is loading)
		if (!(walletsList.state === 'hasValue')) {
			setTimeout(handleButtonClick, 200);
		}

		if (!isDesktop() && walletsList.contents.embeddedWallet) {
			connector.connect({ jsBridgeKey: walletsList.contents.embeddedWallet.jsBridgeKey });
			return;
		}

		const tonkeeperConnectionSource = {
			universalLink: walletsList.contents.walletsList[0].universalLink,
			bridgeUrl: walletsList.contents.walletsList[0].bridgeUrl,
		};

		const universalLink = connector.connect(tonkeeperConnectionSource);

		if (isMobile()) {
			openLink(addReturnStrategy(universalLink, 'none'), '_blank');
		} else {
			setModalUniversalLink(universalLink);
		}
	}, [walletsList]);

	return (
		<>
			<div className={styles.auth_button}>
				{wallet ? (
					<Dropdown overlay={menu}>
						<Button shape="round" type="primary">
							<Space>
								{address}
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
				) : (
					<Button shape="round" type="primary" onClick={handleButtonClick}>
						Connect Wallet
					</Button>
				)}
			</div>
			<Modal
				title="Connect to Tonkeeper"
				open={!!modalUniversalLink}
				onOk={() => setModalUniversalLink('')}
				onCancel={() => setModalUniversalLink('')}
			>
				<QRCode
					size={256}
					style={{ height: '260px', maxWidth: '100%', width: '100%' }}
					value={modalUniversalLink}
					viewBox={`0 0 256 256`}
				/>
			</Modal>
		</>
	);
}