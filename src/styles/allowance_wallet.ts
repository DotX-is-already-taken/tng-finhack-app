import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        backgroundColor: '#1565C0',
        paddingHorizontal: 16,
        paddingVertical: 18,
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


export default styles;