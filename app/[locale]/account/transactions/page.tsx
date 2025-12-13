/**
 * Transaction History Page
 *
 * Displays user's payment transactions:
 * - Credit purchases
 * - Refunds
 * - Failed payments
 * - Downloadable receipts
 */

import { getCurrentUser, getCurrentUserProfile } from '@/lib/supabase/auth'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface TransactionPageProps {
  params: Promise<{ locale: string }>
}

export default async function TransactionsPage({ params }: TransactionPageProps) {
  const { locale } = await params

  // Require authentication
  const user = await getCurrentUser()
  if (!user) {
    redirect(`/${locale}/auth/login`)
  }

  // Fetch user profile for current balance
  const profile = await getCurrentUserProfile()

  // Fetch transactions
  const supabase = await createServerClient()
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Failed to fetch transactions:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Transaktionsverlauf
        </h1>
        <p className="text-muted-foreground">
          Alle Ihre Zahlungen und Gutschriften im Überblick
        </p>
      </div>

      {/* Current Balance Card */}
      <div className="mb-8 rounded-lg border border-primary bg-primary/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Aktuelles Guthaben
            </p>
            <p className="text-4xl font-bold text-primary">
              {profile?.credits_remaining?.toFixed(2) || '0.00'}{' '}
              <span className="text-xl">Credits</span>
            </p>
          </div>
          <Link
            href={`/${locale}/payment`}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Credits kaufen
          </Link>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Datum
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Typ
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Betrag
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Credits
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!transactions || transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg
                        className="h-12 w-12 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-muted-foreground">
                        Noch keine Transaktionen vorhanden
                      </p>
                      <Link
                        href={`/${locale}/payment`}
                        className="mt-2 text-primary hover:underline"
                      >
                        Jetzt Credits kaufen →
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(transaction.created_at).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          transaction.type === 'purchase'
                            ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                            : transaction.type === 'refund'
                            ? 'bg-orange-500/10 text-orange-700 dark:text-orange-400'
                            : transaction.type === 'deduction'
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                            : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {transaction.type === 'purchase' && (
                          <>
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Kauf
                          </>
                        )}
                        {transaction.type === 'refund' && (
                          <>
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Rückerstattung
                          </>
                        )}
                        {transaction.type === 'deduction' && (
                          <>
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                            </svg>
                            Nutzung
                          </>
                        )}
                      </span>
                    </td>

                    {/* Amount */}
                    <td
                      className={`px-6 py-4 text-right text-sm font-medium ${
                        transaction.amount_euro >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.amount_euro >= 0 ? '+' : ''}
                      {transaction.amount_euro?.toFixed(2)} €
                    </td>

                    {/* Credits */}
                    <td
                      className={`px-6 py-4 text-right text-sm font-medium ${
                        transaction.credits_amount >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.credits_amount >= 0 ? '+' : ''}
                      {transaction.credits_amount?.toFixed(2)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                            : 'bg-red-500/10 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {transaction.status === 'completed' && 'Abgeschlossen'}
                        {transaction.status === 'pending' && 'Ausstehend'}
                        {transaction.status === 'failed' && 'Fehlgeschlagen'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      {transaction.paypal_order_id && (
                        <button
                          className="text-sm text-primary hover:underline"
                          title="Beleg herunterladen (in Kürze verfügbar)"
                          disabled
                        >
                          <svg
                            className="inline h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex gap-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-primary mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Hinweise:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Transaktionen werden in Echtzeit aktualisiert</li>
              <li>Belege können nach Abschluss heruntergeladen werden</li>
              <li>Bei Fragen wenden Sie sich an unseren Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
