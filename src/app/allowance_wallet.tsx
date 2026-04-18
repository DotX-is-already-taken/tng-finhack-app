import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Progress } from '@ant-design/react-native';

interface Allowance {
    id: string;
    name: string;
    icon: string;
    color: string;
    remaining: number;
    limit: number;
    used: number;
    progress: number;
    status: string;
}

const spendingCategories: Record<string, Array<{ emoji: string; name: string }>> = {
    medical: [
        { emoji: '🏥', name: 'Clinics' },
        { emoji: '💊', name: 'Pharmacies' },
        { emoji: '🔬', name: 'Labs' },
    ],
    gym: [
        { emoji: '🏋️', name: 'Gyms' },
        { emoji: '🧘', name: 'Yoga Studios' },
        { emoji: '💆', name: 'Wellness' },
    ],
    meals: [
        { emoji: '🍔', name: 'Restaurants' },
        { emoji: '☕', name: 'Cafes' },
        { emoji: '🛒', name: 'Food Markets' },
    ],
    transport: [
        { emoji: '⛽', name: 'Fuel Stations' },
        { emoji: '🚕', name: 'Ride Hailing' },
        { emoji: '🅿️', name: 'Parking' },
    ],
};

const getStatusColor = (status: string): string => {
    return status === 'Low balance' ? '#ff4d4f' : '#52c41a';
};

const getProgressColor = (progress: number): string => {
    if (progress > 70) return '#ff4d4f';
    if (progress > 40) return '#faad14';
    return '#52c41a';
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        backgroundColor: '#1565C0',
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 12,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#999',
        fontWeight: '500',
        marginBottom: 4,
    },
    summaryAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    summarySubtext: {
        fontSize: 12,
        color: '#999',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    allowanceCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    cardIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardIcon: {
        fontSize: 28,
    },
    cardTitleSection: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    statusTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff',
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    balanceSection: {
        flex: 1,
    },
    balanceLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
        marginBottom: 4,
    },
    balanceAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    limitLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
        marginBottom: 4,
    },
    limitAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    progressContainer: {
        marginTop: 12,
    },
    progressLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressLabelText: {
        fontSize: 11,
        color: '#999',
    },
    progressPercentage: {
        fontSize: 11,
        fontWeight: '600',
        color: '#333',
    },
    spendingCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    spendingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    categorySection: {
        marginBottom: 16,
    },
    categoryTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryEmoji: {
        fontSize: 18,
        marginRight: 8,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    categoryTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    tagText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        marginLeft: 4,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#1976D2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    infoText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
});

export default function AllowanceWallets() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const allowances: Allowance[] = [
        {
            id: 'medical',
            name: 'Medical',
            icon: '🏥',
            color: 'red',
            remaining: 450.0,
            limit: 600.0,
            used: 150.0,
            progress: 75,
            status: 'Active',
        },
        {
            id: 'gym',
            name: 'Gym / Wellness',
            icon: '💪',
            color: 'green',
            remaining: 180.0,
            limit: 300.0,
            used: 120.0,
            progress: 60,
            status: 'Active',
        },
        {
            id: 'meals',
            name: 'Meals',
            icon: '🍽️',
            color: 'orange',
            remaining: 220.0,
            limit: 500.0,
            used: 280.0,
            progress: 44,
            status: 'Active',
        },
        {
            id: 'transport',
            name: 'Transport',
            icon: '🚗',
            color: 'blue',
            remaining: 85.0,
            limit: 400.0,
            used: 315.0,
            progress: 21,
            status: 'Low balance',
        },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()}>
                        {/*<ChevronLeft color="#fff" size={24} />*/}
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Allowance Wallets</Text>
                </View>

                {/* Total summary card */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total Available</Text>
                    <Text style={styles.summaryAmount}>RM 935.00</Text>
                    <Text style={styles.summarySubtext}>from RM 1,800.00 monthly limit</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom , paddingTop: insets.top - 20 }}
            >
                {/* Allowance cards */}
                <View style={styles.contentContainer}>
                    {allowances.map((allowance) => (
                        <TouchableOpacity
                            key={allowance.id}
                            onPress={() =>
                                router.push({
                                    pathname: "/allowance_details",
                                    params: { type: allowance.id },
                                })
                            }
                            activeOpacity={0.7}
                        >
                            <View style={styles.allowanceCard}>
                                {/* Card header */}
                                <View style={styles.cardHeader}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <View style={styles.cardIconContainer}>
                                            <Text style={styles.cardIcon}>{allowance.icon}</Text>
                                        </View>
                                        <View style={styles.cardTitleSection}>
                                            <Text style={styles.cardTitle}>{allowance.name}</Text>
                                            <View
                                                style={[
                                                    styles.statusTag,
                                                    {
                                                        backgroundColor: getStatusColor(allowance.status),
                                                    },
                                                ]}
                                            >
                                                <Text style={styles.statusText}>{allowance.status}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/*<ChevronRight color="#ccc" size={20} />*/}
                                </View>

                                {/* Balance info */}
                                <View style={styles.balanceRow}>
                                    <View style={styles.balanceSection}>
                                        <Text style={styles.balanceLabel}>Remaining</Text>
                                        <Text style={styles.balanceAmount}>
                                            RM {allowance.remaining.toFixed(2)}
                                        </Text>
                                    </View>
                                    <View style={styles.balanceSection}>
                                        <Text style={styles.limitLabel}>Monthly Limit</Text>
                                        <Text style={styles.limitAmount}>
                                            RM {allowance.limit.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>

                                {/* Progress bar */}
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressLabel}>
                                        <Text style={styles.progressLabelText}>
                                            Used RM {allowance.used.toFixed(2)}
                                        </Text>
                                        <Text style={styles.progressPercentage}>
                                            {100 - allowance.progress}%
                                        </Text>
                                    </View>
                                    <Progress
                                        percent={allowance.progress}
                                        // strokeColor={getProgressColor(allowance.progress)}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Spending Categories */}
                <View style={styles.contentContainer}>
                    <View style={styles.spendingCard}>
                        <Text style={styles.spendingTitle}>Where you can spend</Text>

                        {allowances.map((allowance) => (
                            <View key={allowance.id} style={styles.categorySection}>
                                <View style={styles.categoryTitle}>
                                    <Text style={styles.categoryEmoji}>{allowance.icon}</Text>
                                    <Text style={styles.categoryName}>{allowance.name}</Text>
                                </View>
                                <View style={styles.categoryTags}>
                                    {spendingCategories[allowance.id]?.map((category, idx) => (
                                        <View key={idx} style={styles.tag}>
                                            <Text>{category.emoji}</Text>
                                            <Text style={styles.tagText}>{category.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Info card */}
                <View style={styles.contentContainer}>
                    <View style={styles.infoCard}>
                        <Text style={[styles.infoTitle, { fontSize: 18, marginBottom: 8 }]}>ℹ️</Text>
                        <Text style={styles.infoTitle}>About Allowance Wallets</Text>
                        <Text style={styles.infoText}>
                            These are employer-funded spending categories. Balances refresh monthly and can only
                            be used at eligible merchants.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
